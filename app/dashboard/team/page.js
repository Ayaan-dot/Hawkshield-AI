// app/dashboard/team/page.js
'use client';

import { useState } from 'react';
import { 
  Users, UserPlus, Shield, Mail, Calendar, MoreVertical,
  CheckCircle, XCircle, Clock, Crown, Key, Trash2, Edit,
  Search, Filter, Download
} from 'lucide-react';

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@company.com',
      role: 'Admin',
      status: 'active',
      joinDate: '2024-01-15',
      permissions: ['Full Access', 'Billing', 'Team Management'],
      avatarColor: 'bg-orange-500'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah@company.com',
      role: 'Analyst',
      status: 'active',
      joinDate: '2024-01-20',
      permissions: ['View Scans', 'Create Reports'],
      avatarColor: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@company.com',
      role: 'Viewer',
      status: 'pending',
      joinDate: '2024-02-01',
      permissions: ['View Only'],
      avatarColor: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Jessica Williams',
      email: 'jessica@company.com',
      role: 'Analyst',
      status: 'active',
      joinDate: '2023-12-10',
      permissions: ['View Scans', 'Create Reports', 'Export Data'],
      avatarColor: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@company.com',
      role: 'Viewer',
      status: 'inactive',
      joinDate: '2023-11-05',
      permissions: ['View Only'],
      avatarColor: 'bg-red-500'
    }
  ];

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full system access', count: 1 },
    { id: 'analyst', name: 'Analyst', description: 'Can analyze and report', count: 2 },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access', count: 2 },
  ];

  const permissions = [
    { id: 'full_access', name: 'Full Access', description: 'Complete system control' },
    { id: 'team_manage', name: 'Team Management', description: 'Add/remove team members' },
    { id: 'billing', name: 'Billing', description: 'View and manage billing' },
    { id: 'scan_view', name: 'View Scans', description: 'Access scan results' },
    { id: 'scan_create', name: 'Create Scans', description: 'Initiate new scans' },
    { id: 'report_create', name: 'Create Reports', description: 'Generate analytics reports' },
    { id: 'data_export', name: 'Export Data', description: 'Download scan data' },
    { id: 'api_keys', name: 'API Keys', description: 'Manage API access' },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || 
      member.status === activeFilter ||
      member.role === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Members', value: '5', change: '+2' },
    { label: 'Active', value: '3', change: '+1' },
    { label: 'Pending', value: '1', change: '0' },
    { label: 'Admins', value: '1', change: '0' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage team members and permissions</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            <div className="text-xs text-green-600 mt-2">+{stat.change} this month</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Team Members */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['all', 'active', 'pending', 'inactive'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 text-sm font-medium rounded-md capitalize ${
                          activeFilter === filter
                            ? 'bg-white text-gray-900 shadow'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <div key={member.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${member.avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                        {member.name.charAt(0)}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{member.name}</h3>
                          {member.role === 'Admin' && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            member.status === 'active' ? 'bg-green-100 text-green-800' :
                            member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Shield className="h-3 w-3 mr-1" />
                            {member.role}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined {member.joinDate}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {member.permissions.map((permission, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Roles & Permissions */}
        <div className="space-y-6">
          {/* Roles */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Roles</h2>
            
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{role.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{role.count} members</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <button className="w-full text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Edit Role
                  </button>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              + Create New Role
            </button>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Permissions</h2>
            
            <div className="space-y-3">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{permission.name}</div>
                    <div className="text-xs text-gray-600">{permission.description}</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Key className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Member Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-xl p-5 text-white">
            <h3 className="font-bold mb-3 flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Invite Team Member
            </h3>
            <p className="text-orange-100 text-sm mb-4">
              Invite colleagues to collaborate on your Hawkshield AI projects.
            </p>
            <button className="w-full py-2.5 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Send Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Team Usage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Top Users by Scans</h3>
            <div className="space-y-3">
              {[
                { name: 'Alex Johnson', scans: 845, role: 'Admin' },
                { name: 'Sarah Miller', scans: 632, role: 'Analyst' },
                { name: 'Jessica Williams', scans: 521, role: 'Analyst' },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600">{user.role}</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">{user.scans.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { user: 'Alex Johnson', action: 'Created scan', time: '2 min ago' },
                { user: 'Sarah Miller', action: 'Exported report', time: '15 min ago' },
                { user: 'Michael Chen', action: 'Joined team', time: '1 hour ago' },
                { user: 'Jessica Williams', action: 'Updated permissions', time: '2 hours ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Role Distribution</h3>
            <div className="space-y-4">
              {[
                { role: 'Admin', percentage: 20, color: 'bg-orange-500' },
                { role: 'Analyst', percentage: 40, color: 'bg-blue-500' },
                { role: 'Viewer', percentage: 40, color: 'bg-gray-400' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.role}</span>
                    <span className="font-medium text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}