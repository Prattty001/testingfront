import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Crown, Settings, User, Mail } from "lucide-react";
import { TeamInviteModal } from "@/components/team/TeamInviteModal";

const mockTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    joinDate: "2024-01-01",
    lastActive: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    joinDate: "2024-01-05",
    lastActive: "2024-01-14",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "member",
    joinDate: "2024-01-10",
    lastActive: "2024-01-13",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily@example.com",
    role: "viewer",
    joinDate: "2024-01-12",
    lastActive: "2024-01-15",
  },
];

const TeamSharing = () => {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const getRoleIcon = (role) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4" />;
      case "admin":
        return <Settings className="w-4 h-4" />;
      case "member":
        return <User className="w-4 h-4" />;
      case "viewer":
        return <Mail className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "member":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "viewer":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleInvite = (email) => {
    const newMember = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      role: "member",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: "Pending invitation",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Team Sharing</h1>
            <p className="text-muted-foreground">
              Collaborate on financial planning with your team
            </p>
          </div>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="gradient-primary"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {teamMembers.filter((m) => m.role === "owner").length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {teamMembers.filter((m) => m.role === "admin").length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage team members and their access permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(member.joinDate).toLocaleDateString()} •
                        Last active {member.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getRoleColor(
                        member.role
                      )}`}
                    >
                      {getRoleIcon(member.role)}
                      {member.role.charAt(0).toUpperCase() +
                        member.role.slice(1)}
                    </div>
                    {member.role !== "owner" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invite Modal */}
        <TeamInviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={handleInvite}
        />
      </div>
    </AppLayout>
  );
};

export default TeamSharing;
