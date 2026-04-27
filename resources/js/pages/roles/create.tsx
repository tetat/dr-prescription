import RoleController from '@/actions/App/Http/Controllers/RoleController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/roles';
import { Form, Head } from '@inertiajs/react';

const RoleCreate = () => {
    const breadcrumbsData = [
        {
            title: 'Manage Roles',
            href: index().url,
        },
        {
            title: 'Create Role',
            href: create().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Role" />

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create a Role
                </h2>
                <Form
                    {...RoleController.store.form()}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Role name (ex: Admin)"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="guard_name">
                                        Guard Name
                                    </Label>
                                    <Input
                                        id="guard_name"
                                        type="text"
                                        tabIndex={2}
                                        autoComplete="guard_name"
                                        name="guard_name"
                                        defaultValue="web"
                                        readOnly
                                    />
                                    <InputError message={errors.guard_name} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 h-11 w-full cursor-pointer rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
                                    tabIndex={3}
                                    data-test="register-role-button"
                                >
                                    {processing && <Spinner />}Create Role
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
};

export default RoleCreate;
