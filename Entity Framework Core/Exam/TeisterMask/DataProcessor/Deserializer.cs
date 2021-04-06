namespace TeisterMask.DataProcessor
{
    using System;
    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using Data;
    using Newtonsoft.Json;
    using TeisterMask.Data.Models;
    using TeisterMask.Data.Models.Enums;
    using TeisterMask.DataProcessor.ImportDto;
    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedProject
            = "Successfully imported project - {0} with {1} tasks.";

        private const string SuccessfullyImportedEmployee
            = "Successfully imported employee - {0} with {1} tasks.";

        public static string ImportProjects(TeisterMaskContext context, string xmlString)
        {
            var sb = new StringBuilder();

            var projectsDto = XmlConverter.Deserializer<ProjectImportModel>(xmlString, "Projects");

            var projects = new List<Project>();

            foreach (var projectDto in projectsDto)
            {
                if (!IsValid(projectDto))
                {
                    sb.AppendLine(ErrorMessage);

                    continue;
                }


                var isProjectOpenDateValid = DateTime.TryParseExact(projectDto.OpenDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime projectOpenDate);

                if (!isProjectOpenDateValid)
                {
                    sb.AppendLine(ErrorMessage);

                    continue;
                }

                var isProjectDueDateValid = DateTime.TryParseExact(projectDto.DueDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime projectDueDate);

                var project = new Project
                {
                    Name = projectDto.Name,
                    OpenDate = projectOpenDate,
                    DueDate = isProjectDueDateValid ? (DateTime?)projectDueDate : null
                };

                foreach (var task in projectDto.Tasks)
                {
                    var isTaskOpenDateValid = DateTime.TryParseExact(task.OpenDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime taskOpenDate);

                    var isTaskDueDateValid = DateTime.TryParseExact(task.DueDate, "dd/MM/yyyy",
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime taskDueDate);

                    if (!IsValid(task) || !isTaskOpenDateValid || !isTaskDueDateValid)
                    {
                        sb.AppendLine(ErrorMessage);

                        continue;
                    }

                    if (isProjectOpenDateValid && taskOpenDate < projectOpenDate || isProjectDueDateValid && taskDueDate > projectDueDate)
                    {
                        sb.AppendLine(ErrorMessage);

                        continue;
                    }

                    else
                    {
                        project.Tasks.Add(new Task
                        {
                            Name = task.Name,
                            OpenDate = taskOpenDate,
                            DueDate = taskDueDate,
                            ExecutionType = (ExecutionType)task.ExecutionType,
                            LabelType = (LabelType)task.LabelType
                        });
                    }
                }

                projects.Add(project);

                sb.AppendLine(string.Format(SuccessfullyImportedProject, project.Name, project.Tasks.Count));
            }

            context.Projects.AddRange(projects);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        public static string ImportEmployees(TeisterMaskContext context, string jsonString)
        {
            var sb = new StringBuilder();

            var employeesDto = JsonConvert.DeserializeObject<IEnumerable<EmployeeImportModel>>(jsonString);

            var employees = new List<Employee>();

            foreach (var employeeDto in employeesDto)
            {
                if (!IsValid(employeeDto))
                {
                    sb.AppendLine(ErrorMessage);

                    continue;
                }

                var employee = new Employee
                {
                    Username = employeeDto.Username,
                    Email = employeeDto.Email,
                    Phone = employeeDto.Phone
                };

                var uniqueTaskIds = employeeDto.Tasks.Distinct();

                foreach (var taskId in uniqueTaskIds)
                {
                    var currentTask = context.Tasks.FirstOrDefault(x => x.Id == taskId);

                    if (currentTask == null)
                    {
                        sb.AppendLine(ErrorMessage);

                        continue;
                    }
                    else
                    {
                        employee.EmployeesTasks.Add(new EmployeeTask
                        {
                            Employee = employee,
                            Task = currentTask
                        });
                    }
                }

                employees.Add(employee);

                sb.AppendLine(string.Format(SuccessfullyImportedEmployee, employee.Username, employee.EmployeesTasks.Count));
            }

            context.Employees.AddRange(employees);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }
    }
}