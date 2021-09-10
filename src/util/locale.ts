import LocalizedStrings from 'react-localization';

export const strings: any = new LocalizedStrings({
    ar: {
        pageNotFoundTitle: "صفحة غير موجودة",
        pageNotFoundDescription: "الصفحه التى تحاول الوصول لها غير موجوده.",
        returnHome: "الرجوع للرئيسية",
        save: "حفظ",
        edit: "تعديل",
        delete: "حذف",
        confirm: "موافق",
        cancel: "إلغاء",
        addNew: "إضافة جديد",
        id: "#",
        fullName: "الاسم بالكامل",
        phone: "رقم الهاتف",
        email: "البريد الالكترونى",
        isBlocked: "موقوف",
        createdAt: "منشئ منذ",
        actions: "الاكشن",
        logout: "تسجيل الخروج",
        firstName: "الاسم الاول",
        lastName: "اسم العائلة",
        login: {
            loginTitle: "تسجيل الدخول للموقع",
            signIn: "تسجيل الدخول",
            rememberMe: "حفظ البيانات",
            email: "البريد الالكترونى",
            password: "كلمة المرور"
        },
        validation: {
            invalidEmail: "البريد الالكترونى غير صحيح",
            required: "حقل مطلوب",
            minFieldChars: "اقل عدد {0} حروف",
            minNumChars: "اقل رقم {0}"
        },
        alert: {
            pleaseWait: "برجاء الانتظار...",
            sureDelete: "هل ترغب فى إستكمال الحذف؟"
        },
        dashboard: {
            navigation: "تصفح",
            dashboard: "الرئيسية",
            copyrights: "جميع الحقوق محفوظة لتطبيق مسمار 2021",
            admins: "مديرى النظام"
        },
        admins: {
            role: "التصاريح",
            roles: {
                admin: "أدمن",
                operator: "منظم",
                viewer: "مشاهد"
            }
        }
    }
});