<style lang="stylus">
.feed
    .hotfollow
        margin-top: 19px
        .ivu-card-body
            padding: 0
            .tit
                height: 42px
                line-height: 42px
                padding: 0 26px 0 24px
                background: #64778a
                color: #fff
                border-radius: 3px 3px 0 0
                .rmore
                    font-size: 14px
                    float: right
                    a
                        color: #fff
    .searchwrap
        margin: 0 0 14px
</style>

<template>
    <div class="feed appwrap topMargin">
        <Row :gutter="24">
            <Col span="7">
                <div class="myfollow">
                    <z_myFollow @changeGroup="changeGroup" @changeUser="changeUser"></z_myFollow>
                </div>
                <div class="hotfollow">
                    <Card dis-hover>
                        <div class="tit">热门关注<span class="rmore"><a @click="$router.push({name: 'recommend'})" href="javascript:;">更多 &gt;</a></span></div>
                        <z_recommend mode="small" :perpage="6"></z_recommend>
                    </Card>
                </div>
            </Col>
            <Col span="17">
                <!-- <div class="searchwrap">
                    <Input>
                        <Button slot="append" icon="ios-search-strong"></Button>
                    </Input>
                </div> -->
                <div class="feedwrap">
                    <z_feedList ref="feedlist" :dishover="false"></z_feedList>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import z_recommend from '@/components/common/z-recommend';
import z_myFollow from '@/components/common/z-myFollow';
import z_feedList from '@/components/common/z-feedList';

export default {
    name: 'feed',
    data () {
        return {
            imgUrl
        }
    },
    methods: {
        changeGroup(id) {
            this.$refs.feedlist.changeFilter('group', id);
        },
        changeUser(id) {
            this.$refs.feedlist.changeFilter('user', id);
        }
    },
    components: {
        z_recommend,
        z_myFollow,
        z_feedList
    }
}
</script>
