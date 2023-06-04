import { plainToInstance, ClassConstructor } from "class-transformer";

export function serialize<Serializer extends ClassConstructor<unknown>>(serializer: Serializer, plain: unknown) {
    return plainToInstance(serializer, plain, {
        strategy: "excludeAll",
        excludeExtraneousValues: true,
    });
}
