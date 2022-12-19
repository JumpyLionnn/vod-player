export interface Badge{
    click_action: string;
    click_url: string;
    description: string;
    image_url_1x: string;
    image_url_2x: string;
    image_url_4x: string;
    title: string;
}

export interface BadgeGroup{
    versions: {
        [number: string]: Badge
    }
}
interface Badges{
    [name: string]: BadgeGroup
}
export default Badges;