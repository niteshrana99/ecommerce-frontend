"use client";

import { ApiAlert } from "@/components/api-alert";
import { useParams } from "next/navigation";

interface APIListProps {
    entityName: string;
    entityIdName: string
}
export const APIList = ({entityName, entityIdName}: APIListProps) => {

    const params = useParams();

    const baseUrl = `https://ecommerce-sever-zc8lh.ondigitalocean.app/api/${params.storeId}`
    return <div className="p-8">
        <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
        <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
        <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </div>
}