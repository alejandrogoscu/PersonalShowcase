<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;


class ProductSeeder extends Seeder
{

    public function run(): void
    {
        $products = [
            [
                'name' => 'Full Stack Developer - Desarrollo de Calidad',
                'slug' => 'full-stack-developer-desarrollo-de-calidad',
                'short_description' => 'Desarrollador con base técnica sólida y enfoque profesional',
                'description' => 'Desarrollador full-stack con base técnica sólida y experiencia en proyectos reales. Enfocado en escribir código limpio y mantenible, construir aplicaciones web bien estructuradas y aplicar buenas prácticas de desarrollo con clara orientación a la mejora continua.',
                'category' => 'technical',
                'price_label' => 'Base técnica sólida + Pasión por la tecnología',
                'image_url' => null,
                'features' => [
                    'Código limpio, legible y mantenible',
                    'Buenas prácticas de arquitectura y organización',
                    'Capacidad de análisis y resolución de problemas',
                    'Testing y debugging orientados a calidad'
                ],
                'technical_skills' => [
                    'HTML5 & CSS3',
                    'JavaScript/TypeScript',
                    'React/Angular',
                    'Java/Spring Boot',
                    'MySQL, PostgreSQL, MongoDB',
                    'APIs REST',
                    'Git & GitHub',
                    'Laravel',
                    'Docker'
                ],
                'display_order' => 1,
                'active' => true,
            ],
            [
                'name' => 'Evolución Profesional - Versión Pro',
                'slug' => 'evolucion-profesional-version-pro',
                'short_description' => 'Desarrollador proactivo, adaptable y en mejora continua',
                'description' => 'Profesional con fuerte orientación a la mejora continua y adaptación a nuevos entornos tecnológicos. Capaz de incorporar rápidamente nuevas herramientas y metodologías, aplicándolas de forma efectiva en proyectos reales y contextos cambiantes.',
                'category' => 'learning',
                'price_label' => 'Motivación infinita + Curiosidad insaciable',
                'image_url' => null,
                'features' => [
                    'Autoaprendizaje acelerado y constante',
                    'Investigación efectiva y documentación técnica',
                    'Resolución creativa de problemas complejos',
                    'Ampliación progresiva del stack técnico'
                ],
                'technical_skills' => null,
                'display_order' => 2,
                'active' => true,
            ],
            [
                'name' => 'Colaboración Profesional - Pack Equipo',
                'slug' => 'colaboracion-profesional-pack-equipo',
                'short_description' => 'Team player apasionado, fiable y orientado al trabajo en equipo',
                'description' => 'Profesional con actitud colaborativa y comunicación clara, orientado a aportar valor dentro del equipo de forma responsable y sostenible. Acostumbrado a trabajar de manera coordinada, respetando procesos, tiempos y objetivos comunes.',
                'category' => 'teamwork',
                'price_label' => 'Colaboración efectiva + Valores de ECIGLOGÍSTICA',
                'image_url' => null,
                'features' => [
                    'Colaboración efectiva y responsable',
                    'Comunicación clara y constructiva',
                    'Respeto por procesos y tiempos establecidos',
                    'Mentalidad colaborativa orientada a objetivos'
                ],
                'technical_skills' => null,
                'display_order' => 3,
                'active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
