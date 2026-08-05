import React from 'react';
import { 
  Trees, 
  Cat, 
  BookOpen, 
  Apple, 
  Fish, 
  Bike, 
  Dog, 
  Sparkles, 
  Utensils, 
  Compass, 
  CloudRain, 
  Bird, 
  Palette, 
  ShoppingBag, 
  Cake, 
  Trophy, 
  Sprout, 
  Bus, 
  HeartHandshake, 
  Recycle, 
  ChefHat, 
  Droplets, 
  SpellCheck, 
  Stethoscope, 
  Heart, 
  Wheat, 
  Sun, 
  ShieldCheck, 
  School,
  Search
} from 'lucide-react';

interface Props {
  type: string;
  title: string;
  themeColor?: string;
}

export const IllustrationCard: React.FC<Props> = ({ type, title, themeColor = 'amber' }) => {
  // Render stylized visual cartoon composition based on type
  const renderGraphic = () => {
    switch (type) {
      case 'tree_planting':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-emerald-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute top-2 right-4 text-emerald-300 animate-pulse"><Sun className="w-10 h-10" /></div>
              <div className="flex items-end gap-3 z-10">
                <Trees className="w-16 h-16 text-emerald-600 animate-float" />
                <Sprout className="w-12 h-12 text-emerald-500 animate-bounce" />
                <div className="bg-amber-800/20 p-2 rounded-full border-2 border-amber-600">
                  <Trees className="w-10 h-10 text-emerald-700" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'kitten_lost':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-amber-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <div className="p-3 bg-amber-200 rounded-2xl border-2 border-amber-400 animate-float">
                  <Cat className="w-16 h-16 text-amber-700" />
                </div>
                <Search className="w-12 h-12 text-amber-500 animate-pulse" />
              </div>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-sky-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-3 z-10">
                <BookOpen className="w-16 h-16 text-sky-600 animate-float" />
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
            </div>
          </div>
        );
      case 'fruit_garden':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-rose-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Apple className="w-14 h-14 text-rose-500 animate-bounce" />
                <Trees className="w-14 h-14 text-emerald-600 animate-float" />
              </div>
            </div>
          </div>
        );
      case 'fish_pond':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-cyan-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Fish className="w-14 h-14 text-cyan-600 animate-float" />
                <Droplets className="w-10 h-10 text-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>
        );
      case 'bicycle':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-orange-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Bike className="w-16 h-16 text-orange-600 animate-float" />
                <ShieldCheck className="w-10 h-10 text-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        );
      case 'puppy_rescue':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-amber-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Dog className="w-16 h-16 text-amber-700 animate-float" />
                <Heart className="w-10 h-10 text-rose-500 animate-bounce" />
              </div>
            </div>
          </div>
        );
      case 'cleaning_day':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-teal-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-3 z-10">
                <Sparkles className="w-14 h-14 text-teal-600 animate-spin" />
                <School className="w-14 h-14 text-teal-700 animate-float" />
              </div>
            </div>
          </div>
        );
      case 'lunch':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-indigo-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-3 z-10">
                <Utensils className="w-16 h-16 text-indigo-600 animate-bounce" />
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </div>
        );
      case 'park_trip':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-green-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Compass className="w-14 h-14 text-green-600 animate-spin" />
                <Trees className="w-14 h-14 text-emerald-600 animate-float" />
              </div>
            </div>
          </div>
        );
      case 'rainy_day':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-blue-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <CloudRain className="w-16 h-16 text-blue-600 animate-bounce" />
                <School className="w-12 h-12 text-slate-600" />
              </div>
            </div>
          </div>
        );
      case 'bird_nest':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-lime-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Bird className="w-16 h-16 text-lime-700 animate-float" />
                <Trees className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
          </div>
        );
      case 'art_contest':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-purple-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Palette className="w-16 h-16 text-purple-600 animate-float" />
                <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        );
      case 'market':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-pink-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <ShoppingBag className="w-16 h-16 text-pink-600 animate-bounce" />
                <Apple className="w-12 h-12 text-rose-500" />
              </div>
            </div>
          </div>
        );
      case 'birthday':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-violet-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Cake className="w-16 h-16 text-violet-600 animate-float" />
                <Sparkles className="w-10 h-10 text-amber-400 animate-spin" />
              </div>
            </div>
          </div>
        );
      case 'soccer':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-emerald-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Trophy className="w-16 h-16 text-amber-500 animate-bounce" />
                <Sparkles className="w-10 h-10 text-emerald-600" />
              </div>
            </div>
          </div>
        );
      case 'veggie_garden':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-green-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Sprout className="w-16 h-16 text-green-600 animate-float" />
                <Droplets className="w-10 h-10 text-cyan-500 animate-bounce" />
              </div>
            </div>
          </div>
        );
      case 'museum_bus':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-indigo-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Bus className="w-16 h-16 text-indigo-600 animate-float" />
                <BookOpen className="w-10 h-10 text-amber-500" />
              </div>
            </div>
          </div>
        );
      case 'helping_friend':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-rose-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <HeartHandshake className="w-16 h-16 text-rose-600 animate-pulse" />
                <BookOpen className="w-10 h-10 text-sky-500" />
              </div>
            </div>
          </div>
        );
      case 'recycling':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-teal-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Recycle className="w-16 h-16 text-teal-600 animate-spin" />
                <Sparkles className="w-10 h-10 text-amber-400" />
              </div>
            </div>
          </div>
        );
      case 'cooking':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-amber-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <ChefHat className="w-16 h-16 text-amber-700 animate-float" />
                <Utensils className="w-10 h-10 text-amber-500" />
              </div>
            </div>
          </div>
        );
      case 'saving_water':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-cyan-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Droplets className="w-16 h-16 text-cyan-600 animate-bounce" />
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
          </div>
        );
      case 'vocab_study':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-sky-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <SpellCheck className="w-16 h-16 text-sky-600 animate-float" />
                <Sparkles className="w-10 h-10 text-amber-400 animate-spin" />
              </div>
            </div>
          </div>
        );
      case 'first_aid':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-red-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Stethoscope className="w-16 h-16 text-red-600 animate-float" />
                <Heart className="w-10 h-10 text-rose-500 animate-bounce" />
              </div>
            </div>
          </div>
        );
      case 'thankyou_card':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-pink-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Heart className="w-16 h-16 text-pink-600 animate-bounce" />
                <BookOpen className="w-10 h-10 text-amber-500" />
              </div>
            </div>
          </div>
        );
      case 'rice_field':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-amber-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Wheat className="w-16 h-16 text-amber-600 animate-float" />
                <Sun className="w-12 h-12 text-amber-400 animate-spin" />
              </div>
            </div>
          </div>
        );
      case 'ant_bee':
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-orange-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Sparkles className="w-14 h-14 text-orange-500 animate-spin" />
                <Sun className="w-12 h-12 text-amber-400 animate-bounce" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative flex items-center justify-center h-full">
            <div className="absolute inset-0 bg-amber-100/60 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                <Search className="w-16 h-16 text-amber-600 animate-float" />
                <BookOpen className="w-12 h-12 text-amber-500 animate-bounce" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-44 sm:h-52 bg-white rounded-3xl p-3 shadow-md border-4 border-amber-200 relative overflow-hidden group">
      {renderGraphic()}
      <div className="absolute bottom-2 left-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-amber-200 text-center shadow-xs">
        <span className="text-xs sm:text-sm font-bold text-amber-900 truncate block">
          {title}
        </span>
      </div>
    </div>
  );
};
