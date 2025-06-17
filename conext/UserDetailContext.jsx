import { useState, useEffect } from "react";    
import React from "react";
import { supabase } from "@/services/superbaseClient";

export const UserDetailContext = React.createContext();