const userUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;
const assessUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/assessment`;
export const api = {
  signup: `${userUrl}/signup`,
  login: `${userUrl}/login`,
  logout: `${userUrl}/logout`,
  profile: `${userUrl}/profile`,
  myAssessment: `${assessUrl}/my-assessments`,
  saveAssessment: `${assessUrl}/save-assessment`,
  changePassword: `${userUrl}/change-password`,
  // admin api
  getAssessments: `${assessUrl}/get-assessments`,
  getUserAssessments: `${assessUrl}/user-assessments`,
  users: `${userUrl}/get-users`,
  user: `${userUrl}/get-user`,
  forgetPassword: `${userUrl}/forget-password`,
  update: `${userUrl}/update`,
  resetPassword: `${userUrl}/forget-change-password`,
  verifyEmail: `${userUrl}/verify-email`,
};
