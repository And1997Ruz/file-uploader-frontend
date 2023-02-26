export interface ImageWithMetadata {
    filename: string,
    metadata: Metadata[]
}

export interface Metadata {
    description: string,
    tagType: number,
    tagTypeHex: string,
    directoryName: string,
    tagName: string
}