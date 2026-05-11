import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { edit, index, show } from '@/routes/users';
import { Phone, User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    user: User & {
        phones?: Phone[];
    };
}

const UserShow = ({ user }: Props) => {
    const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const breadcrumbsData = [
        {
            title: 'Manage Users',
            href: index().url,
        },
        {
            title: 'User Details',
            href: show(user).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title={`User: ${user.name}`} />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-4 text-center text-2xl font-bold tracking-tight">
                    User Details
                </h2>

                <div className="space-y-6">
                    {/* Info Card */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                        <div className="grid gap-5">
                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Name
                                </Label>
                                <p className="mt-1 text-lg font-semibold">
                                    {user.name}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Email
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Gender
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {capitalizeFirst(user.gender)}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Blood Group
                                </Label>
                                <span className="ms-2 mt-1 inline-block rounded bg-gray-200 px-2 text-sm font-medium dark:bg-neutral-700">
                                    {user.blood_group}
                                </span>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    Address
                                </Label>
                                <p className="mt-1 w-fit rounded bg-muted px-2 py-1 font-mono text-sm text-blue-600">
                                    {user.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Phones Card */}
                    {user.phones?.length > 0 && (
                        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-neutral-900">
                            <Label className="text-base font-semibold">
                                Phones
                            </Label>

                            <div className="mt-4 space-y-5">
                                {user.phones.map((phone) => (
                                    <div key={phone.country_code + phone.number}>
                                        <p className="mb-2 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                                            {phone.country_code} {phone.number}
                                        </p>
                                    </div>
                                ),
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between pt-2">
                        <Link href={index().url}>
                            <Button
                                variant="secondary"
                                className="cursor-pointer px-6"
                            >
                                Back
                            </Button>
                        </Link>

                        <Link href={edit(user.id).url}>
                            <Button className="cursor-pointer bg-green-600 px-6 font-semibold hover:bg-green-700">
                                Edit User
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserShow;
