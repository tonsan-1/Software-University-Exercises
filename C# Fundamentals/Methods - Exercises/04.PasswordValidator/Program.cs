using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace _04.PasswordValidator
{
    class Program
    {
        static void Main(string[] args)
        {
            var password = Console.ReadLine();
            bool isInLength = CheckIfInLength(password);
            bool isOnlyDigitsAndLetters = CheckIfIsOnlyDigitsAndLetters(password);
            bool is2Digits = CheckIfIsAtLeast2Digits(password);
            PrintAttemptToLogIn(isInLength, isOnlyDigitsAndLetters, is2Digits);
        }

        private static void PrintAttemptToLogIn(bool isInLength, bool isOnlyDigitsAndLetters, bool is2Digits)
        {
            if (isInLength && isOnlyDigitsAndLetters && is2Digits) // if all rules are true
            {
                Console.WriteLine("Password is valid");
            }
            if (!isInLength)
            {
                Console.WriteLine("Password must be between 6 and 10 characters");
            }
            if (!isOnlyDigitsAndLetters)
            {
                Console.WriteLine("Password must consist only of letters and digits");
            }
            if (!is2Digits)
            {
                Console.WriteLine("Password must have at least 2 digits");
            }
        }

        static bool CheckIfInLength(string password)
        {
            if (password.Length >= 6 && password.Length <= 10)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        static bool CheckIfIsOnlyDigitsAndLetters(string password)
        {
            if (Regex.IsMatch(password, @"^[a-zA-Z0-9]+$"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        static bool CheckIfIsAtLeast2Digits(string password)
        {
            if (password.Count(c => Char.IsDigit(c)) > 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}