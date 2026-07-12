import { useAuth } from "@/context/AuthContext";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { ref, remove } from "firebase/database";
import { db } from "@/server/firebase";

export default function useDeleteAcc() {
  const { user } = useAuth();

  if (!user) return undefined;

  // db reference
  const userRef = ref(db, "users/" + user.uid);

  function handleDeleteAccount() {
    // IMPORTANT: The user must have signed in recently to delete their account.
    // If not, you'll need to re-authenticate them first.

    const userConfirms = confirm(
      "Are you sure you want to delete your account?",
    );

    if (!user) return undefined;

    if (userConfirms) {
      // Scenario 1: User has signed in recently (e.g., within the last 5 minutes)
      deleteUser(user)
        .then(() => {
          // User deleted successfully
          console.log("User account deleted.");
          alert("Your account has been successfully deleted.");

          // delete user data
          remove(userRef)
            .then(() => {
              console.log(`User data for ${user.uid} deleted successfully.`);
            })
            .catch((error) => {
              console.error("Error deleting user data:", error);
            });

          // Redirect user to a logout or home page
          // window.location.href = '/logout';
        })
        .catch((error) => {
          // An error occurred
          console.error("Error deleting user:", error);

          if (error.code === "auth/requires-recent-login") {
            console.warn(
              "User needs to re-authenticate before account deletion.",
            );
            alert("Please sign in again to confirm account deletion.");

            // Scenario 2: User needs to re-authenticate
            // This is a common requirement for security-sensitive operations.
            // You would typically prompt the user for their credentials again.
            // For this example, let's assume an email/password user and prompt for password.

            const password = prompt(
              "Please enter your password to confirm deletion:",
            );
            if (password) {
              // Ensure user.email exists before creating credential
              if (user.email) {
                const credential = EmailAuthProvider.credential(
                  user.email,
                  password,
                );

                reauthenticateWithCredential(user, credential)
                  .then(() => {
                    // User re-authenticated, now try deleting again
                    console.log("User re-authenticated, retrying deletion...");
                    return deleteUser(user);
                  })
                  .then(() => {
                    console.log(
                      "User account deleted after re-authentication.",
                    );
                    alert("Your account has been successfully deleted.");

                    // delete user data
                    remove(userRef)
                      .then(() => {
                        console.log(
                          `User data for ${user.uid} deleted successfully.`,
                        );
                      })
                      .catch((error) => {
                        console.error("Error deleting user data:", error);
                      });

                    // Redirect user to a logout or home page
                  })
                  .catch((reauthError) => {
                    console.error(
                      "Error during re-authentication or deletion after re-auth:",
                      reauthError,
                    );
                    alert(
                      "Failed to delete account. Please ensure your password is correct and try again, or sign in again.",
                    );
                  });
              } else {
                console.error(
                  "User email not available for re-authentication.",
                );
                alert("Cannot re-authenticate: User email not found.");
              }
            } else {
              alert("Account deletion cancelled: Password not provided.");
            }
          } else {
            // Handle other errors like network issues, permissions, etc.
            alert(`Failed to delete account: ${error.message}`);
          }
        });
    }
  }

  return handleDeleteAccount;
}
