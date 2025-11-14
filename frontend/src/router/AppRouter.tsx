// import { Routes, Route } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
// import GuestRoute from "./GuestRoute";

// // Pages
// import Home from "../pages/Home";
// import { LoginPage } from "@/pages/LoginPage";
// import NotFound from "@/pages/NotFound";


// const AppRouter = () => {
//   return (
//     <Routes>
//       {/* Protected pages */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       {/* Guest only pages */}
//       <Route
//         path="/auth"
//         element={
//           <GuestRoute>
//             <LoginPage />
//           </GuestRoute>
//         }
//       />

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRouter;