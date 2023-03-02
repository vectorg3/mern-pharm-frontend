import { GoodsItem } from './GoodsItem';
import { useSelector } from 'react-redux';
import styles from './GoodStyles.module.scss';

function GoodsList() {
    const goods = useSelector((store) => store.shop.goods);
    if (!goods.length) {
        return <h3>Nothing here</h3>;
    }
    return (
        <div className={styles.cards}>
            {goods.map((item) => (
                <GoodsItem key={item.id} {...item} />
            ))}
        </div>
    );
}
export { GoodsList };
