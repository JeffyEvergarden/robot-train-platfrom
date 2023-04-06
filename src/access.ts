/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; userAuth: any } | undefined,
) {
  const { currentUser, userAuth = [] } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'ADMIN',
    routerAuth: (route: any) => {
      const role: any = route.role;
      if (!role) {
        return true;
      } else if (Array.isArray(role)) {
        const _item = role.find((item: any) => {
          return userAuth.includes(item);
        });
        return !!_item;
      } else {
        return true;
      }
    },
  };
}
