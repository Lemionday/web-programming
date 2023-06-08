import { useAuth } from "../hooks/useAuth"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Session } from "../models/Session"

async function api<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await (response.json() as Promise<{ data: T }>)
    return data.data
}

export async function GetWithAuthentication<T>({ url, requestInit, token }: { url: string; requestInit?: RequestInit, token: string }): Promise<T> {
    try {
        const authHeader = { "Authorization": `Bearer ${token}` }
        if (requestInit === undefined) {
            requestInit = {}
        }

        if (requestInit.headers === undefined) {
            requestInit.headers = new Headers(authHeader)
        } else {
            (requestInit.headers as Headers).append("Authorization", `Bearer ${token}`)
        }

        return await api<T>(url, requestInit)
    } catch (e) {
        throw e
    }
}

export async function GetAllWithAuthentication<T>({ url, requestInit, token }: { url: string; requestInit?: RequestInit, token: string }): Promise<T[]> {
    try {
        const authHeader = { "Authorization": `Bearer ${token}` }
        if (requestInit === undefined) {
            requestInit = {}
        }

        if (requestInit.headers === undefined) {
            requestInit.headers = new Headers(authHeader)
        } else {
            (requestInit.headers as Headers).append("Authorization", `Bearer ${token}`)
        }

        const response = await fetch(url, requestInit)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data: { data?: T[], err?: string } = await response.json()

        if (data.data === undefined) {
            return [] as T[]
        }

        return data.data
    } catch (e) {
        throw e
    }
}