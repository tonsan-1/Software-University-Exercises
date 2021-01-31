SELECT SUM(guest.DepositAmount - host.DepositAmount) AS [Difference]
FROM WizzardDeposits AS host
JOIN WizzardDeposits AS guest ON host.Id = guest.Id + 1