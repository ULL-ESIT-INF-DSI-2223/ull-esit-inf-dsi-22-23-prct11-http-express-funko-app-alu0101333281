/**
 * Una lista de los diferentes tipos de Funko que se pueden tener.
 */
export enum FunkoType {
    POP = "Pop!",
    POP_RIDES = "Pop! Rides",
    VINYL_SODA = "Vinyl Soda",
    VINYL_GOLD = "Vinyl Gold"
}

/**
 * Clase que representa un Funko.
 */
export class Funko {
    getSpecialCharacteristics() {
        throw new Error("Method not implemented.");
    }
    /**
     * Crea una nueva instancia de Funko.
     * @param id Un identificador único para el Funko.
     * @param name El nombre del Funko.
     * @param description Una descripción del Funko.
     * @param type El tipo de Funko, de la enumeración FunkoType.
     * @param gender El género del personaje del Funko.
     * @param franchise La franquicia a la que pertenece el Funko.
     * @param number El número del Funko dentro de la franquicia.
     * @param isExclusive Indica si el Funko es exclusivo.
     * @param specialFeatures Características especiales del Funko.
     * @param value El valor del Funko.
     */
    constructor(
        private id: number, 
        private name: string, 
        private description: string, 
        private type: FunkoType, 
        private gender: string, 
        private franchise: string, 
        private number: number, 
        private isExclusive_: boolean, 
        private specialFeatures: string, 
        private value: number
    ) {}

    /**
     * Obtiene el identificador único del Funko.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Obtiene el nombre del Funko.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Obtiene la descripción del Funko.
     */
    public getDescription(): string {
        return this.description;
    }

    /**
     * Obtiene el tipo del Funko.
     */
    public getType(): FunkoType {
        return this.type;
    }

    /**
     * Obtiene el género del personaje del Funko.
     */
    public getGender(): string {
        return this.gender;
    }

    /**
     * Obtiene la franquicia a la que pertenece el Funko.
     */
    public getFranchise(): string {
        return this.franchise;
    }

    /**
     * Obtiene el número del Funko dentro de la franquicia.
     */
    public getNumber(): number {
        return this.number;
    }

    /**
     * Indica si el Funko es exclusivo.
     */
    public isExclusive(): boolean {
        return this.isExclusive_;
    }

    /**
     * Obtiene las características especiales del Funko.
     */
    public getSpecialFeatures(): string {
        return this.specialFeatures;
    }

    /**
     * Obtiene el valor del Funko.
     */
    public getValue(): number {
        return this.value;
    }
}
