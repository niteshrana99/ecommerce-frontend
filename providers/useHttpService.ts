import { useAuth } from '@clerk/nextjs';
const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}`

const useHttpService = () => {
  const { getToken } = useAuth();
  const get = async (url: string) => {
    const token = await getToken();
    const response = await fetch(`${domain}/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };
  

  const post = async (url: string, data: any) => {
    const token = await getToken();
    const response = await fetch(`${domain}/${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  };

  const deleteRequest = async (url: string) => {
    const token = await getToken();
    const response = await fetch(`${domain}/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  };

  const patch = async (url: string, data: any) => {
    const token = await getToken();
    const response = await fetch(`${domain}/${url}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  };

  return { get, post, deleteRequest, patch };
};

export default useHttpService;
