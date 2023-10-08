/* __placeholder__ */
export default await (async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
useSeoMeta({
title: '로그인 - Remak',
});

const __VLS_componentsOption = {};

let __VLS_name!: 'login';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'TopBar', typeof __VLS_localComponents, "TopBar", "TopBar", "TopBar"> &
__VLS_WithComponent<'NuxtLink', typeof __VLS_localComponents, "NuxtLink", "NuxtLink", "NuxtLink">;
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div;
__VLS_components.TopBar;
// @ts-ignore
[TopBar,];
({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span; ({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).input; ({} as __VLS_IntrinsicElements).input;
({} as __VLS_IntrinsicElements).button; ({} as __VLS_IntrinsicElements).button;
__VLS_components.NuxtLink; __VLS_components.NuxtLink;
// @ts-ignore
[NuxtLink, NuxtLink,];
{
const __VLS_0 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
let __VLS_5!: 'TopBar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.TopBar : (typeof __VLS_resolvedLocalAndGlobalComponents)['TopBar'];
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, }));
({} as { TopBar: typeof __VLS_5; }).TopBar;
const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
{
const __VLS_10 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_12 = __VLS_11({ ...{}, class: ("flex min-h-screen items-center justify-center bg-white"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("flex min-h-screen items-center justify-center bg-white"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_17 = __VLS_16({ ...{}, class: ("text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("text-center"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
{
const __VLS_20 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_22 = __VLS_21({ ...{}, class: ("mb-4 text-2xl font-bold"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("mb-4 text-2xl font-bold"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = ({} as __VLS_IntrinsicElements)["span"];
const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).span;
const __VLS_27 = __VLS_26({ ...{}, class: ("text-sky-500"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, class: ("text-sky-500"), });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
(__VLS_28.slots!).default;
}
{
const __VLS_30 = ({} as __VLS_IntrinsicElements)["span"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
({} as __VLS_IntrinsicElements).span;
({} as __VLS_IntrinsicElements).span;
const __VLS_32 = __VLS_31({ ...{}, class: ("text-gray-800"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, class: ("text-gray-800"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
(__VLS_33.slots!).default;
}
(__VLS_23.slots!).default;
}
{
const __VLS_35 = ({} as __VLS_IntrinsicElements)["input"];
const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
({} as __VLS_IntrinsicElements).input;
const __VLS_37 = __VLS_36({ ...{ onInput: {} as any, }, type: ("email"), placeholder: ("이메일 주소를 입력하세요"), class: ("mb-4 mt-[48px] block h-[56px] w-[440px] rounded-xl border border-gray-300 bg-white px-4 py-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{ onInput: {} as any, }, type: ("email"), placeholder: ("이메일 주소를 입력하세요"), class: ("mb-4 mt-[48px] block h-[56px] w-[440px] rounded-xl border border-gray-300 bg-white px-4 py-2"), });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
(__VLS_ctx.email);
let __VLS_40 = { 'input': __VLS_pickEvent(__VLS_39['input'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_37>).onInput) };
__VLS_40 = {
input: (__VLS_ctx.checkEmail)
};
}
if (__VLS_ctx.showPasswordInput) {
{
const __VLS_41 = ({} as __VLS_IntrinsicElements)["input"];
const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
({} as __VLS_IntrinsicElements).input;
const __VLS_43 = __VLS_42({ ...{}, type: ("password"), placeholder: ("비밀번호를 입력하세요"), class: ("mb-4 mt-4 block h-[56px] w-[440px] rounded-lg border border-gray-300 px-4 py-2"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_43> & Record<string, unknown>) => void)({ ...{}, type: ("password"), placeholder: ("비밀번호를 입력하세요"), class: ("mb-4 mt-4 block h-[56px] w-[440px] rounded-lg border border-gray-300 px-4 py-2"), });
const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43)!;
let __VLS_45!: __VLS_NormalizeEmits<typeof __VLS_44.emit>;
}
// @ts-ignore
[email, checkEmail, showPasswordInput,];
}
{
const __VLS_46 = ({} as __VLS_IntrinsicElements)["button"];
const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
({} as __VLS_IntrinsicElements).button;
({} as __VLS_IntrinsicElements).button;
const __VLS_48 = __VLS_47({ ...{ onClick: {} as any, }, class: ("mb-4 mt-[48px] block h-[56px] w-[440px] rounded-lg border bg-zinc-100 px-4 py-2 text-neutral-300"), disabled: ((!__VLS_ctx.isValidEmail(__VLS_ctx.email))), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_48> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("mb-4 mt-[48px] block h-[56px] w-[440px] rounded-lg border bg-zinc-100 px-4 py-2 text-neutral-300"), disabled: ((!__VLS_ctx.isValidEmail(__VLS_ctx.email))), });
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49.emit>;
(__VLS_ctx.emailClass);
let __VLS_51 = { 'click': __VLS_pickEvent(__VLS_50['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_47, typeof __VLS_48>).onClick) };
__VLS_51 = {
click: (__VLS_ctx.handleNextClick)
};
(__VLS_49.slots!).default;
}
{
let __VLS_52!: 'NuxtLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.NuxtLink : (typeof __VLS_resolvedLocalAndGlobalComponents)['NuxtLink'];
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({ ...{}, to: ("/registerEmail"), class: ("text-xs text-gray-700 underline"), }));
({} as { NuxtLink: typeof __VLS_52; }).NuxtLink;
({} as { NuxtLink: typeof __VLS_52; }).NuxtLink;
const __VLS_54 = __VLS_53({ ...{}, to: ("/registerEmail"), class: ("text-xs text-gray-700 underline"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_52, typeof __VLS_54> & Record<string, unknown>) => void)({ ...{}, to: ("/registerEmail"), class: ("text-xs text-gray-700 underline"), });
const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54)!;
let __VLS_56!: __VLS_NormalizeEmits<typeof __VLS_55.emit>;
(__VLS_55.slots!).default;
}
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
// @ts-ignore
[isValidEmail, email, isValidEmail, email, emailClass, handleNextClick,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
data() {
return {
email: '',
showPasswordInput: false,
};
},
computed: {
emailClass() {
if (this.isValidEmail(this.email)) {
return 'bg-remak-blue text-white';
}
return 'bg-gray-300 text-gray-500';
},
},
methods: {
checkEmail() {
this.isValidEmail(this.email);
},
isValidEmail(email) {
const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
return regex.test(email);
},
handleNextClick() {
this.showPasswordInput = true;
},
},
setup() {
return {};
},
});
return (await import('vue')).defineComponent({
data() {
return {
email: '',
showPasswordInput: false,
};
},
computed: {
emailClass() {
if (this.isValidEmail(this.email)) {
return 'bg-remak-blue text-white';
}
return 'bg-gray-300 text-gray-500';
},
},
methods: {
checkEmail() {
this.isValidEmail(this.email);
},
isValidEmail(email) {
const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
return regex.test(email);
},
handleNextClick() {
this.showPasswordInput = true;
},
},
setup() {
return {};
},
});
})();
