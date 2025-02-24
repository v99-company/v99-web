// Define the type for the scopes object
type Scopes = {
    [role: string]: string[];
  };
  
  export const scopes: Scopes = {
    dev: [
      "create_page", "update_page", "delete_page", "create_offer", "update_offer", "delete_offer",
      "update_home_listing", "admins", "freelancers", "create_page_approvals", "add_business_requests", "update_histories", "client_creds"
    ],
    super: [
      "create_page", "update_page", "delete_page", "create_offer", "update_offer", "delete_offer",
      "update_home_listing", "admins", "freelancers", "create_page_approvals", "add_business_requests", "update_histories", "client_creds"
    ],
    admin: [
      "create_page", "update_page", "delete_page", "create_offer", "update_offer", "delete_offer",
      "update_home_listing", "freelancers", "create_page_approvals", "add_business_requests", "update_histories", "client_creds"
    ],
    editor: [
      "create_page", "update_page", "create_offer", "update_offer", "create_page_approvals"
    ],
    freelancer: ["create_page", "update_page"],
    client: [
      "update_page", "delete_offer", "create_offer",
    ],
  };
  
 
  export function verifyPermission(role: string, requiredScope: string): boolean {
    const allowedScopes = scopes[role as keyof Scopes] || []; // Fallback to empty array if role is unknown
    return allowedScopes.includes(requiredScope);
  }


  export function checkUserPermission(requiredPermission: string, token?: string): boolean {
      // Use the passed token or fallback to localStorage
  const authToken = token || localStorage.getItem("loginToken");
  
    if (!authToken) {
      // If no token exists, return false
      return false;
    }
  
    try {
      // Decode the JWT token
      const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
      console.log("Decoded Tokenn: ", decodedToken);
      const role = decodedToken.role || null;
  
      // Verify the required permission
      return role && verifyPermission(role, requiredPermission);
    } catch (error) {
      console.error("Error verifying permission:", error);
      // If there's an error, assume no permission and return false
      return false;
    }
  }