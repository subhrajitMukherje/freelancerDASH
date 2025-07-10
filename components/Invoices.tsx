'use client'

import React, { useState } from 'react'
import { Plus, Download, Eye, Send, Search, Filter } from 'lucide-react'
import jsPDF from 'jspdf'

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'TechCorp Inc.',
      project: 'E-commerce Website',
      amount: '$4,200',
      status: 'Paid',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      items: [
        { description: 'Website Development', quantity: 1, rate: 3500, amount: 3500 },
        { description: 'UI/UX Design', quantity: 1, rate: 700, amount: 700 }
      ]
    },
    {
      id: 'INV-2024-002',
      client: 'StartupXYZ',
      project: 'Mobile App Design',
      amount: '$2,800',
      status: 'Pending',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      items: [
        { description: 'App UI Design', quantity: 1, rate: 1800, amount: 1800 },
        { description: 'Prototype Development', quantity: 1, rate: 1000, amount: 1000 }
      ]
    },
    {
      id: 'INV-2024-003',
      client: 'LocalBiz',
      project: 'Brand Identity',
      amount: '$1,500',
      status: 'Overdue',
      issueDate: '2024-01-05',
      dueDate: '2024-01-25',
      items: [
        { description: 'Logo Design', quantity: 1, rate: 800, amount: 800 },
        { description: 'Brand Guidelines', quantity: 1, rate: 700, amount: 700 }
      ]
    }
  ]

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const generatePDF = (invoice: any) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(24)
    doc.text('INVOICE', 20, 30)
    
    // Invoice details
    doc.setFontSize(12)
    doc.text(`Invoice #: ${invoice.id}`, 20, 50)
    doc.text(`Issue Date: ${invoice.issueDate}`, 20, 60)
    doc.text(`Due Date: ${invoice.dueDate}`, 20, 70)
    
    // Client info
    doc.text('Bill To:', 20, 90)
    doc.text(invoice.client, 20, 100)
    doc.text(`Project: ${invoice.project}`, 20, 110)
    
    // Items table
    let yPosition = 130
    doc.text('Description', 20, yPosition)
    doc.text('Qty', 100, yPosition)
    doc.text('Rate', 130, yPosition)
    doc.text('Amount', 160, yPosition)
    
    yPosition += 10
    doc.line(20, yPosition, 190, yPosition)
    
    invoice.items.forEach((item: any) => {
      yPosition += 10
      doc.text(item.description, 20, yPosition)
      doc.text(item.quantity.toString(), 100, yPosition)
      doc.text(`$${item.rate}`, 130, yPosition)
      doc.text(`$${item.amount}`, 160, yPosition)
    })
    
    // Total
    yPosition += 20
    doc.line(130, yPosition, 190, yPosition)
    yPosition += 10
    doc.setFontSize(14)
    doc.text(`Total: ${invoice.amount}`, 130, yPosition)
    
    doc.save(`${invoice.id}.pdf`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Invoices</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Invoice</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoice Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{invoice.id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.client} • {invoice.project}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{invoice.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Issue Date</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{invoice.issueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{invoice.dueDate}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Items</h4>
              <div className="space-y-2">
                {invoice.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.description}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.quantity} × ${item.rate}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">${item.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => generatePDF(invoice)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
              <button className="flex items-center space-x-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Send className="w-4 h-4" />
                <span>Send Invoice</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Invoices