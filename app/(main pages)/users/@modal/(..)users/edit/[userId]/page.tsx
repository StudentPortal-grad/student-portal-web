"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UserForm, { UserFormData } from "../../../../components/UserForm";

const mockUser: UserFormData = {
  firstName: "Kate",
  lastName: "Morrison",
  email: "test@test.com",
  dateOfBirth: "February 24th, 2002",
  role: "Admin",
  avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
};

export default function EditUserModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <UserForm
        mode="edit"
        user={mockUser}
        onSave={(data: UserFormData) => {
          console.log("Saved user:", data);
          router.back();
        }}
        onCancel={() => router.back()}
      />
    </div>
  );
}
