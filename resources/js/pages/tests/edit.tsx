import TestController from '@/actions/App/Http/Controllers/TestController';
import TestForm from '@/components/tests/test-form';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/tests';
import { Test } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const TestEdit = ({ test }: { test: Test }) => {
    const { data, setData, put, processing, errors } = useForm<Test>({
        id: test.id,
        name: test.name,
        description: test.description,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(TestController.update.url(test.id));
    };

    const breadcrumbsData = [
        { title: 'Manage Tests', href: index().url },
        { title: 'Edit Test', href: edit(test.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsData}>
            <Head title="Edit Test" />
            <p className="mt-2 text-right text-sm text-muted-foreground">
                Fields marked with <span className="text-red-500">*</span> are
                required
            </p>

            <div className="mx-auto mt-6 w-2xl p-4">
                <h2 className="py-3 text-center text-2xl font-bold">
                    Edit Test
                </h2>

                <TestForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={onSubmit}
                    isEditMode={true}
                />
            </div>
        </AppLayout>
    );
};

export default TestEdit;
