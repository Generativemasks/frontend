import { useEffect, useState } from "react";

const useGetMetadataList = (loading: boolean, error: any, data: any) => {
  const [metadataList, setMetadataList] = useState<any[]>([]);

  useEffect(() => {
    const f = async () => {
      if (loading || error || !data) {
        return;
      }
      const metadataList: any[] = await Promise.all(
        data.tokens.map(async (token: any) => {
          return fetch(token.tokenURI).then(async (res) => {
            const metadata = await res.json();
            return {
              id: token.id,
              owner: token.owner,
              ...metadata,
            };
          });
        })
      );

      metadataList.map((metadata) => {
        metadata.image = `https://cloudflare-ipfs.com/ipfs/${
          metadata.image.split("://")[1]
        }`;
        return metadata;
      });

      setMetadataList(metadataList);
    };
    f();
  }, [loading, error, data, setMetadataList]);

  return { metadataList };
};

export default useGetMetadataList;
