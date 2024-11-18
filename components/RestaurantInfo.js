import React from "react";
import {
    Card,
    Skeleton,
    Button,
    CardHeader,
    CardBody,
    Divider,
} from "@nextui-org/react";

export default function RestaurantInfo({ restaurant, isLoading }) {
    return (
        <div className="flex flex-col gap-3">
            <Card className="w-[200px] space-y-5 p-3" radius="md" isBlurred>
                <div className="space-y-3">
                    <Skeleton
                        isLoaded={!isLoading}
                        className="w-3/5 rounded-lg "
                    >
                        <CardHeader className="h-3 w-full px-3 pt-3 pb-0 rounded-lg font-semibold text-xl">
                            <h2>{restaurant.name}</h2>
                        </CardHeader>
                    </Skeleton>

                    <Skeleton
                        isLoaded={!isLoading}
                        className="w-5/5 rounded-lg"
                    >
                        <CardBody className="">
                            <p className="">
                                {restaurant.cuisine} | {restaurant.location}
                            </p>
                            <Divider className="my-2 w-10"></Divider>
                            <p className="pr-3">{restaurant.description}</p>
                        </CardBody>
                    </Skeleton>
                </div>
            </Card>
        </div>
    );
}
