const YEAR = new Date().getFullYear();

module.exports = [
  {
    claimType: 'Accident',
    claimFault: 2, // You
    claimDate: { day: '01', month: '01', year: YEAR - 1 },
    claimNoClaimsAffected: true
  },
  {
    claimType: 'Theft',
    claimStolen: 8, // Theft of vehicle
    claimDate: { day: '04', month: '04', year: YEAR - 3 },
    claimNoClaimsAffected: false
  }
];