"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 

import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setIdentifier("");
    setPassword("");
    setPasswordStatus(true); // Hide the password error label by default
  }, []);

  const loginUser = async (user: any) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) { 
        const data = await response.json(); 
        localStorage.setItem('loginToken', data.token);
  
        // Optionally, store user information in local storage or state management
        localStorage.setItem('user', JSON.stringify(data.user));
  
        router.push('/admin');
      } else {
        const errorData = await response.json(); // Parse error message if available
        console.error('Login failed:', errorData.message || 'An error occurred');
        alert(errorData.message || 'An error occurred while logging in.'); // Display error message to user
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred. Please try again later.'); // Display network error message to user
    }
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    console.log("Identifier:", identifier); // Log email/phone
    console.log("Plain Text Password:", password);

    if (password === '') {
      alert('Please enter a password');
      return; // Exit if no password is provided
    }

    const user = {
      username: identifier, // Send identifier instead of email
      password: password,
    }

    await loginUser(user);
  };

  return (
    <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
      <div className="w-[400px] bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Log In</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* Identifier Input (Email/Phone) */}
          <label className="mb-1" htmlFor="identifier">
            Email or Phone Number
          </label>
          <Input
            type="text"
            id="identifier"
            required
            autoComplete="email" // Generic autocomplete for username
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mb-4"
          />
  
          {/* Password Input */}
          <label className="mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative mb-4">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10" // Add padding to the right for the icon
            />
            <button 
              type="button" 
              onClick={() => setPasswordVisible(!passwordVisible)} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
  
          {/* Conditional Password Label */}
          {!passwordStatus && (
            <label className="mb-3 text-red-500">
              Incorrect password. Please try again.
            </label>
          )}
  
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>

        </form>
      </div>
    </div>
  );
}
