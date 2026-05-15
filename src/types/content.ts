export interface RunEvent {
  id: string
  title: string
  location: string
  dateLabel: string
  note: string
}

export interface JournalArticle {
  id: string
  title: string
  dek: string
  date: string
  readTime: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
}
