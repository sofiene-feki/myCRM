import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const createContract = async (contract, authtoken) =>
  await axios.post(`${API_BASE_URL}/contract`, contract, {
    headers: {
      authtoken,
    },
  });

export const getContract = async (clientRef, energie) =>
  await axios.get(`${API_BASE_URL}/contract/${clientRef}/${energie}`);

export const getAdminRows = async (paginationModel, sortOptions, quickFilter) =>
  await axios.post(`${API_BASE_URL}/admin-contracts/`, {
    paginationModel,
    sortOptions,
    quickFilter,
  });

export const getQtéRows = async (paginationModel, sortOptions, quickFilter) =>
  await axios.post(`${API_BASE_URL}/qty-contracts/`, {
    paginationModel,
    sortOptions,
    quickFilter,
  });

export const getSavRows = async (paginationModel, sortOptions, quickFilter) =>
  await axios.post(`${API_BASE_URL}/sav-contracts/`, {
    quickFilter,
    paginationModel,
    sortOptions,
  });

export const getWcRows = async (quickFilter) =>
  await axios.post(`${API_BASE_URL}/wc-contracts/`, {
    quickFilter,
  });
//       ------------------ CONTRACT FILTERS ------------------

export const getFilters = async (
  serverFilters,
  paginationModel,
  sortOptions,
  quickFilter
) =>
  await axios.post(`${API_BASE_URL}/Filters/`, {
    serverFilters,
    paginationModel,
    sortOptions,
    quickFilter,
  });

export const getquickFilters = async (quickFilter) =>
  await axios.post(`${API_BASE_URL}/quickFilters/`, {
    quickFilter,
  });

//       ------------------ CONTRACT RESERVATION ------------------

export const getReservation = async (id, user) =>
  await axios.post(`${API_BASE_URL}/${id}/reserve`, {
    user,
  });

//       ------------------ CONTRACT UPDATE ------------------

export const updateContractSav = async (
  slug,
  energie,
  qualificationsSav,
  authtoken
) =>
  await axios.put(
    `${API_BASE_URL}/contract/update/sav/${slug}/${energie}`,
    qualificationsSav,
    {
      headers: {
        authtoken,
      },
    }
  );
export const updateContractWc = async (
  slug,
  energie,
  qualificationsWc,
  authtoken
) =>
  await axios.put(
    `${API_BASE_URL}/contract/update/wc/${slug}/${energie}`,
    qualificationsWc,
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateContractQte = async (
  slug,
  energie,
  qualificationsQté,
  authtoken
) =>
  await axios.put(
    `${API_BASE_URL}/contract/update/quality/${slug}/${energie}`,
    qualificationsQté,
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateContract = async (slug, energie, values, authtoken) =>
  await axios.put(
    `${API_BASE_URL}/contract/update/${slug}/${energie}`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getContractsExport = async (filters) =>
  await axios.post(`${API_BASE_URL}/contracts/export`, {
    filters,
  });
