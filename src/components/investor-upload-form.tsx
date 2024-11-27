"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { read, utils } from "xlsx"
import { toast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SpreadsheetData {
  Email: string
  "Total Coins": number
  "Start date": string
  "End date": string
}

export function InvestorUploadForm({ onSubmit }: { onSubmit: (data: SpreadsheetData[]) => void }) {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const tableRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<{ [key: string]: HTMLTableCellElement | null }>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = utils.sheet_to_json<SpreadsheetData>(worksheet)
        setSpreadsheetData(jsonData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse spreadsheet. Please check the format.",
          variant: "destructive",
        })
      }
    }

    reader.readAsArrayBuffer(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (spreadsheetData.length === 0) {
      toast({
        title: "Error",
        description: "Please upload a spreadsheet before submitting.",
        variant: "destructive",
      })
      return
    }
    onSubmit(spreadsheetData)
  }

  useEffect(() => {
    if (searchTerm && tableRef.current) {
      const matchingCellKey = Object.keys(cellRefs.current).find(key => 
        key.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (matchingCellKey) {
        const matchingCell = cellRefs.current[matchingCellKey]
        matchingCell?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
      }
    }
  }, [searchTerm])

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    return (
      <span>
        {parts.filter(String).map((part, i) => (
          regex.test(part) ? <mark key={i} className="text-black bg-yellow-200">{part}</mark> : <span key={i}>{part}</span>
        ))}
      </span>
    )
  }

  return (
    <div className="flex items-start justify-center w-full p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-8 p-6 rounded-xl bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-[2px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] border border-white/20">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label 
              htmlFor="spreadsheet" 
              className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
            >
              Upload Investor Spreadsheet
            </Label>
            {
                spreadsheetData.length === 0 && <div
                {...getRootProps()}
                className="flex items-center justify-center h-32 text-white transition-all duration-200 border rounded-lg shadow-inner cursor-pointer bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 focus:border-white/30 hover:bg-white/20"
              >
                <input {...getInputProps()} id="spreadsheet" />
                {isDragActive ? (
                  <p className="text-center text-white/80">Drop the file here ...</p>
                ) : (
                  <p className="text-center text-white/80">Drag and drop a spreadsheet here, or click to select one<br/>
                    <span className="text-sm text-white/60">(Supports .xlsx, .xls, and .csv files)</span>
                  </p>
                )}
              </div>
            }
            
          </div>
          
          {spreadsheetData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label 
                  htmlFor="search"
                  className="text-sm font-medium tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"
                >
                  Search
                </Label>
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-white bg-white/10 border-white/20 placeholder:text-white/60"
                  />
                </div>
              </div>
              
              <div className="overflow-hidden border rounded-lg border-white/20">
                <div ref={tableRef} className="max-h-[40vh] overflow-auto">
                  <table className="min-w-full divide-y divide-white/20">
                    <thead className="sticky top-0 text-white bg-black">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-left">Email</th>
                        <th className="px-4 py-3 text-sm font-medium text-left">Total Coins</th>
                        <th className="px-4 py-3 text-sm font-medium text-left">Start date</th>
                        <th className="px-4 py-3 text-sm font-medium text-left">End date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-white/10">
                      {spreadsheetData.map((row, index) => (
                        <tr key={index} className="hover:bg-white/5">
                          {Object.entries(row).map(([key, value]) => (
                            <td 
                              key={`${index}-${key}`}
                              ref={el => cellRefs.current[`${index}-${key}-${value}`] = el}
                              className="px-4 py-3 text-sm text-white whitespace-nowrap"
                            >
                              {highlightText(value.toString(), searchTerm)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 font-medium tracking-wide text-white transition-all duration-200 border rounded-lg shadow-lg bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-sm border-white/20 hover:border-white/30"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}