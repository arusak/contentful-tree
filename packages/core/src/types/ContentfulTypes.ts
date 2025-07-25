import type { Entry, EntryCollection, EntryFieldTypes } from 'contentful'

// Define the content types as specified in the requirements

export interface ContentfulEmployeeRole {
  contentTypeId: 'employeeRole'
  fields: {
    title: EntryFieldTypes.Text
    color: EntryFieldTypes.Text
  }
}

export interface ContentfulInstruction {
  contentTypeId: 'instruction'
  fields: {
    title: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    roles: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ContentfulEmployeeRole>>
  }
}

export interface ContentfulFolder {
  contentTypeId: 'folder'
  fields: {
    title: EntryFieldTypes.Text
    children: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ContentfulFolder | ContentfulInstruction>>
  }
}

// Type for the resolved path structure
export interface InstructionWithPath {
  id: string
  title: string
  description: string
  path: string[]
  roles: {
    id: string
    title: string
    color: string
  }[]
}

// Response types for Contentful API
export type FolderEntry = Entry<ContentfulFolder>
export type InstructionEntry = Entry<ContentfulInstruction>
export type EmployeeRoleEntry = Entry<ContentfulEmployeeRole>

export type FolderCollection = EntryCollection<ContentfulFolder>
export type InstructionCollection = EntryCollection<ContentfulInstruction>
export type EmployeeRoleCollection = EntryCollection<ContentfulEmployeeRole>
