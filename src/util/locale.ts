import LocalizedStrings from 'react-localization';

export const strings: any = new LocalizedStrings({
    ar: {
        pageNotFoundTitle: "صفحة غير موجودة",
        pageNotFoundDescription: "الصفحه التى تحاول الوصول لها غير موجوده.",
        returnHome: "الرجوع للرئيسية",
        save: "حفظ",
        edit: "تعديل",
        delete: "حذف",
        show:"عرض",
        confirm: "موافق",
        cancel: "إلغاء",
        addNew: "إضافة جديد",
        id: "#",
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
            password: "كلمة المرور",
            registerNew: "تسجيل حساب جديد",
            register: "تسجيل",
            name: "الاسم",
            retypedPassword: "كلمة المرور المكررة"
        },
        validation: {
            invalidEmail: "البريد الالكترونى غير صحيح",
            required: "حقل مطلوب",
            minFieldChars: "اقل عدد {0} حروف",
            minNumChars: "اقل رقم {0}",
            passwordRegxNotMatch: "يجب ان يحتوى على حرف كبير وحرف صغير ورقم",
            mustNotContainsSpaces: "يجب الا يحتوى على مسافات",
            passwordsNotMatch: "كلمتى المرور غير متطابقتين"
        },
        alert: {
            pleaseWait: "برجاء الانتظار...",
            basketIsEmpty:"السلة فارغة"
        },
        dashboard: {
            navigation: "تصفح",
            products: "المنتجات",
            copyrights: "جميع الحقوق محفوظة لابتكار 2021"
        },
        products:{
            addToCard:"إضافة"
        },
        basket:{
            items:"العناصر",
            order:"أطلب",
            total:"الاجمالى",
            completeOrder:"إرسال الطلب",
            userPhone:"رقم الهاتف",
            userEmail:"البريد الالكترونى",
            userAddress:"العنوان"
        }
    }
});