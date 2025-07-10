'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, Phone, Mail, MapPin, MessageCircle, Calendar } from 'lucide-react'

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const clients = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA 94000',
      avatar: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      totalProjects: 3,
      totalPaid: '$12,500',
      activeProjects: 1,
      lastContact: '2024-01-15',
      notes: [
        { date: '2024-01-15', note: 'Discussed upcoming e-commerce project requirements' },
        { date: '2024-01-10', note: 'Payment received for website redesign project' }
      ]
    },
    {
      id: 2,
      name: 'StartupXYZ',
      email: 'hello@startupxyz.com',
      phone: '+1 (555) 987-6543',
      address: '456 Innovation Ave, Austin, TX 78701',
      avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      totalProjects: 2,
      totalPaid: '$6,000',
      activeProjects: 2,
      lastContact: '2024-01-20',
      notes: [
        { date: '2024-01-20', note: 'Reviewed mobile app wireframes, approved design direction' },
        { date: '2024-01-12', note: 'Initial consultation for mobile app project' }
      ]
    },
    {
      id: 3,
      name: 'LocalBiz',
      email: 'info@localbiz.com',
      phone: '+1 (555) 456-7890',
      address: '789 Main Street, Denver, CO 80202',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      totalProjects: 1,
      totalPaid: '$2,800',
      activeProjects: 0,
      lastContact: '2024-01-10',
      notes: [
        { date: '2024-01-10', note: 'Brand identity project completed, final files delivered' },
        { date: '2024-01-05', note: 'Presented brand concepts, client chose option 2' }
      ]
    }
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Clients</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Client</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client List */}
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer ${
                selectedClient?.id === client.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{client.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{client.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{client.totalProjects}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{client.totalPaid}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{client.activeProjects}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {selectedClient ? (
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{selectedClient.name}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last contact: {selectedClient.lastContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Communication Log
                </h3>
                <div className="space-y-3">
                  {selectedClient.notes.map((note: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Note</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{note.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{note.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Add Note
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  Edit Client
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Select a client to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Clients