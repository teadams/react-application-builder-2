// ACS Enterprise Core
// Auth  Module
// Copyright © 2019-2023 ACSPropel and Tracy Adams. All rights reserved.

export interface ACSAuthContext {
  userId?: number;
  user?: { [key: string]: unknown };
  logout?: () => void;
  login?: (acsUserAuthContext: { [key: string]: unknown }) => void;
}

export default ACSAuthContext;
