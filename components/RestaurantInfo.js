import React from "react";
import {
    Card,
    Skeleton,
    Button,
    CardHeader,
    CardBody,
} from "@nextui-org/react";

export default function RestaurantInfo({ restaurant, isLoading }) {
    return (
        <div className="flex flex-col gap-3">
            <Card className="w-[200px] space-y-5 p-3" radius="lg">
                <div className="space-y-3">
                    <Skeleton
                        isLoaded={!isLoading}
                        className="w-3/5 rounded-lg "
                    >
                        <CardHeader className="h-3 w-full p-3 rounded-lg">
                            {restaurant.name}
                        </CardHeader>
                    </Skeleton>

                    <Skeleton
                        isLoaded={!isLoading}
                        className="w-5/5 rounded-lg"
                    >
                        <CardBody className="">
                            <p className="">
                                {restaurant.cuisine} ~ {restaurant.location}
                            </p>
                            <p className="pr-3">{restaurant.description}</p>
                        </CardBody>
                    </Skeleton>
                </div>
            </Card>
        </div>
    );
}
