export interface Jwt {
    generate(payload: Record<string, unknown>, expiresIn?: string): Promise<string>;

    validate(token: string): Promise<Record<string, unknown> | null>;

    sign(payload: Record<string, unknown>, secret: string, expiresIn?: string): Promise<string>;

    decode(token: string): Promise<Record<string, unknown> | null>;

    invalidate(token: string): Promise<boolean>;
}
