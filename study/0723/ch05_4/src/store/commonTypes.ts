export type UUID = string

export type User = {
  uuid: UUID
  name: string
  jobTitle: string
  email: string
  avatar: string
}

export type Card = {
  uuid: UUID
  writer: User
  image: string
  title: string
  paragraphs: string
  dayMonthYearDate: string
  relativeDate: string | null
}

export type List = {
  uuid: UUID
  title: string
}

export type ListidCardidS = Record<UUID, UUID[]>

export type ListidCardid = {
  listid: UUID
  cardid: UUID
}