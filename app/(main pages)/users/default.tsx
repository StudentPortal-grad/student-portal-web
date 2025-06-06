"use client";

import UsersTable from "./components/UsersTable";
import { User } from "./components/columns";

const mockUsers: User[] = [
  {
    id: "CM9801",
    name: "Kate Morrison",
    email: "test@test.com",
    role: "Admin",
    registrationDate: "Just now",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "CM9802",
    name: "Koray Okumus",
    email: "test@test.com",
    role: "Student",
    registrationDate: "A minute ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "CM9803",
    name: "Lana Steiner",
    email: "test@test.com",
    role: "Student",
    registrationDate: "1 hour ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "CM9804",
    name: "Natali Craig",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Yesterday",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "CM9804",
    name: "Orlando Diggs",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Yesterday",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "CM9801",
    name: "Kate Morrison",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Feb 2, 2023",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "CM9802",
    name: "Koray Okumus",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Feb 3, 2023",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "CM9803",
    name: "Lana Steiner",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Feb 4, 2023",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "CM9804",
    name: "Natali Craig",
    email: "test@test.com",
    role: "Student",
    registrationDate: "Feb 5, 2023",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "CM9805",
    name: "Orlando Diggs",
    email: "test@test.com",
    role: "Admin",
    registrationDate: "Feb 6, 2023",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export default function page() {
  return (
    <section className="flex flex-col gap-4 bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">User Management</h1>
      <UsersTable />
    </section>
  );
}
