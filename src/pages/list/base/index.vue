<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="handleSetupContract"> 新建合同 </t-button>
          <t-button
            variant="base"
            theme="default"
            :disabled="!selectedRowKeys.length"
          >
            导出合同
          </t-button>
          <p v-if="!!selectedRowKeys.length" class="selected-count">
            已选{{ selectedRowKeys.length }}项
          </p>
        </div>
        <div class="search-input">
          <t-input
            v-model="searchValue"
            placeholder="请输入你需要搜索的内容"
            clearable
          >
            <template #suffix-icon>
              <search-icon size="16px" />
            </template>
          </t-input>
        </div>
      </t-row>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="top"
        :hover="true"
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        @select-change="rehandleSelectChange"
      >
        <template #status="{ row }">
          <t-tag
            v-if="row.status === CONTRACT_STATUS.FAIL"
            theme="danger"
            variant="light"
          >
            审核失败
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING"
            theme="warning"
            variant="light"
          >
            待审核
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.EXEC_PENDING"
            theme="warning"
            variant="light"
          >
            待履行
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.EXECUTING"
            theme="success"
            variant="light"
          >
            履行中
          </t-tag>
          <t-tag
            v-if="row.status === CONTRACT_STATUS.FINISH"
            theme="success"
            variant="light"
          >
            已完成
          </t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
        <template #paymentType="{ row }">
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT"
            class="payment-col"
          >
            付款<trend class="dashboard-item-trend" type="up" />
          </div>
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECEIPT"
            class="payment-col"
          >
            收款<trend class="dashboard-item-trend" type="down" />
          </div>
        </template>

        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="handleClickDetail()">详情</t-link>
            <t-link theme="danger" @click="handleClickDelete(slotProps)"
              >删除</t-link
            >
          </t-space>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选合同？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "ListBase",
};
</script>

<script setup lang="ts">
import { SearchIcon } from "tdesign-icons-vue-next";
import { MessagePlugin, SelectOptions, TableRowData } from "tdesign-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { getList } from "@/api/list";
import Trend from "@/components/trend/index.vue";
import { prefix } from "@/config/global";
import {
  CONTRACT_PAYMENT_TYPES,
  CONTRACT_STATUS,
  CONTRACT_TYPES,
} from "@/constants";
import { useSettingStore } from "@/store";

import { COLUMNS } from "./constants";

const store = useSettingStore();

const data = ref([]);
const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});

const searchValue = ref("");

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { list } = await getList();
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return "";
});

onMounted(() => {
  fetchData();
});

const confirmVisible = ref(false);

const selectedRowKeys = ref([1, 2]);

const router = useRouter();

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx.value, 1);
  pagination.value.total = data.value.length;
  const selectedIdx = selectedRowKeys.value.indexOf(deleteIdx.value);
  if (selectedIdx > -1) {
    selectedRowKeys.value.splice(selectedIdx, 1);
  }
  confirmVisible.value = false;
  MessagePlugin.success("删除成功");
  resetIdx();
};

const onCancel = () => {
  resetIdx();
};

const rowKey = "index";

const rehandleSelectChange = (val: (string | number)[]) => {
  selectedRowKeys.value = val as number[];
};
const rehandlePageChange = (curr: unknown, pageInfo: unknown) => {
  console.log("分页变化", curr, pageInfo);
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log("统一Change", changeParams, triggerAndData);
};
const handleClickDetail = () => {
  router.push("/detail/base");
};
const handleSetupContract = () => {
  router.push("/form/base");
};
const handleClickDelete = (row: { rowIndex: any }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};

const computedStyle = getComputedStyle(document.documentElement);
const sizeXl = computedStyle.getPropertyValue("--td-comp-size-xl");

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? parseFloat(sizeXl) : 0,
      container: `.${prefix}-layout`,
    }) as any,
);
</script>

<style lang="less" scoped>
.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: var(--td-comp-margin-s);
  }
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.left-operation-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-l);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}
</style>
