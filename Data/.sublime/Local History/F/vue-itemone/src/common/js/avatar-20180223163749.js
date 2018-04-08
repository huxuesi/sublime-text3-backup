/**
 * 给头像加hash，去缓存
 * @param {string} id 头像用户的id号
 * return 加hash后的头像地址 `${imgUrl}/uploads/avatar/${id}.jpg?${store.state.userInfo.avatar_hash}`;
 * 目前只有用户自己的头像采用
 */
export function avatarHash(id) {
    if( this.$store.state.userInfo && id == this.$store.state.userInfo.id && this.$store.state.userInfo.avatar_hash ) {
        /* 自己的头像 */
        return `${apiurl}/uploads/avatar/${id}.jpg?${this.$store.state.userInfo.avatar_hash}`;
    }else {
        return `${apiurl}/uploads/avatar/${id}.jpg`;
    }
}
