export type TSynonyms = [] | string[];

export type TAntonyms = [] | string[];

export type TDefinition = {
    definition: string,
    example: string,
    synonyms: TSynonyms,
    antonyms: TAntonyms
};

export type TMeaning = {
    partOfSpeech: string,
    definitions: TDefinition[],
    synonyms: TSynonyms,
    antonyms: TAntonyms
};

export type TPhonetics = {
    text?: string,
    audio?: string
}[];

export type TWordDefinition = {
    word: string,
    phonetic: string,
    phonetics: TPhonetics,
    origin: string,
    meanings: TMeaning[]
}[];

export type TError = {
    message: string,
    resolution: string,
    title: string
}