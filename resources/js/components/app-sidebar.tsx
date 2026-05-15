import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import degrees from '@/routes/degrees';
import doctors from '@/routes/doctors';
import examinations from '@/routes/examinations';
import hospitals from '@/routes/hospitals';
import institutes from '@/routes/institutes';
import medicineGroups from '@/routes/medicine-groups';
import medicines from '@/routes/medicines';
import patients from '@/routes/patients';
import permissions from '@/routes/permissions';
import roles from '@/routes/roles';
import specialities from '@/routes/specialities';
import tests from '@/routes/tests';
import users from '@/routes/users';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Lock,
    Shield,
    Users,
    Stethoscope,
    GraduationCap,
    Layers,
    Building,
    TestTube2,
    HeartPulse,
    Hospital,
    Dna,
    Pill,
} from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Doctors',
        href: doctors.index().url,
        icon: Stethoscope,
    },
    {
        title: 'Institutes',
        href: institutes.index().url,
        icon: Building,
    },
    {
        title: 'Degrees',
        href: degrees.index().url,
        icon: GraduationCap,
    },
    {
        title: 'Specialities',
        href: specialities.index().url,
        icon: Layers,
    },
    {
        title: 'Hospitals',
        href: hospitals.index().url,
        icon: Hospital,
    },
    {
        title: 'Medicine Groups',
        href: medicineGroups.index().url,
        icon: Dna,
    },
    {
        title: 'Medicines',
        href: medicines.index().url,
        icon: Pill,
    },
    {
        title: 'Patients',
        href: patients.index().url,
        icon: Users,
    },
    {
        title: 'Tests',
        href: tests.index().url,
        icon: TestTube2,
    },
    {
        title: 'Examinations',
        href: examinations.index().url,
        icon: HeartPulse,
    },
    {
        title: 'Users',
        href: users.index().url,
        icon: Users,
    },
    {
        title: 'Roles',
        href: roles.index().url,
        icon: Lock,
    },
    {
        title: 'Permissions',
        href: permissions.index().url,
        icon: Shield,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: FolderGit2,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
