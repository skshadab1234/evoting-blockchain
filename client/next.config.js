module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/admin_login",
        destination: "http://localhost:3001/admin_login",
      },
      {
        source: "/admin_profile",
        destination: "http://localhost:3001/admin_profile",
      },
      {
        source: "/admin_getdata",
        destination: "http://localhost:3001/admin_getdata",
      },
      {
        source: "/admin_logout",
        destination: "http://localhost:3001/admin_logout",
      },

      // Users 
      {
        source: "/login",
        destination: "http://localhost:3001/login",
      },
    ];
  };
  return {
    rewrites,
  };
};


// Server

// module.exports = () => {
//   const rewrites = () => {
//     return [
//       {
//         source: "/login",
//         destination: "https://ciiyc-2022.herokuapp.com/login",
//       },
//       {
//         source: "/profile",
//         destination: "https://ciiyc-2022.herokuapp.com/profile",
//       },
//       {
//         source: "/getdata",
//         destination: "https://ciiyc-2022.herokuapp.com/getdata",
//       },
//       {
//         source: "/logout",
//         destination: "https://ciiyc-2022.herokuapp.com/logout",
//       },
//       {
//         source: "/register",
//         destination: "https://ciiyc-2022.herokuapp.com/register",
//       },
//       {
//         source: "/uploadTest",
//         destination: "https://ciiyc-2022.herokuapp.com/uploadTest",
//       },
//       {
//         source: "/EndTest",
//         destination: "https://ciiyc-2022.herokuapp.com/EndTest",
//       },
//       {
//         source: "/settings",
//         destination: "https://ciiyc-2022.herokuapp.com/settings",
//       },
//       {
//         source: "/getWinnersList",
//         destination: "https://ciiyc-2022.herokuapp.com/getWinnersList",
//       },
//       {
//         source: "/GetUserScore",
//         destination: "https://ciiyc-2022.herokuapp.com/GetUserScore",
//       },
//     ];
//   };
//   return {
//     rewrites,
//   };
// };