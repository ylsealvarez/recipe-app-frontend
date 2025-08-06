'use client'
import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/effect-coverflow'
import { RecipeCard } from 'app/components/recipecard';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { fetcher } from '../../../../lib/fetcher';
import styles from "./TopRecipes.module.sass"

export const TopRecipes = () => {
    const fetchTopRecipes = async (url: string): Promise<Recipe[]> => {
        const data = await fetcher<Recipe[]>(url, { useApi: true });
        return data ?? [];
    };

    // 2. Lo pasamos a useSWR
    const { data: recipes = [], error } = useSWR<Recipe[], Error>(
        '/api/recipes/top',
        fetchTopRecipes
    );
    if (error) return <div>Error loading recipes.</div>;
    if (!recipes) return <div>Loading...</div>;

    return (
        <section className={styles.TopRecipes}>
            <h2 className={styles.TopRecipes__title}>Most-loved Recipes</h2>
            <div className={styles.TopRecipes__swiperContainer}>
                <Swiper
                    className={styles.TopRecipes__swiper}
                    modules={[Navigation, Pagination, Autoplay, Keyboard]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={false}                                   // bucle continuo
                    rewind={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {recipes.map((recipe) => (
                        <SwiperSlide key={recipe.idRecipe}>
                            <RecipeCard recipe={recipe} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};