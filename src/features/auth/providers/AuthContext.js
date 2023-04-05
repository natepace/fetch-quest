import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "~/src/components";
import {
  ME_QUERY,
  REFRESH_TOKEN_MUTATION,
  VERIFY_TOKEN_MUTATION,
} from "../api";

export const AuthContext = createContext({ user, setUser });

export function AuthProvider() {
  const [user, setUser] = useState(null);
}
