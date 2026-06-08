import TestController from '@/actions/App/Http/Controllers/TestController';
import TestForm from '@/components/tests/test-form';
import AppLayout from '@/layouts/app-layout';
import { create, index } from '@/routes/tests';
import { Test } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const TestCreate = () => {
    const { data, setData, post, processing, errors } = useForm<Test>({
        id: 0,
        name: '',
        description: '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(TestController.store.url());
    };

    const breadcrumbsData = [
        { title: 'Manage Tests', href: index().url },
        { title: 'Create Test', href: create().url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Create Test" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Create Test
                </h2>

                <TestForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    isEditMode={false}
                />
            </div>
        </AppLayout>
    );
};

export default TestCreate;
