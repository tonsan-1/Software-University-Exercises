SELECT Mountains.MountainRange, Peaks.PeakName, Peaks.Elevation
  FROM Mountains
  JOIN Peaks ON Peaks.MountainId = Mountains.Id
  WHERE Mountains.MountainRange = 'Rila'
ORDER BY Peaks.Elevation DESC