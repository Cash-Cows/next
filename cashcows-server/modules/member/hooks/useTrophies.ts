//types
import type { NetworkConfig } from 'modules/web3/types';
import type { RankedData } from 'modules/ui/types';
import type { TrophyProps } from '../types';
//hooks
import { useState, useEffect } from 'react';
//config
import { cdn } from 'project.config';
//web3
import { read } from 'modules/web3';

const holderGoals = [
  { name: 'Cowboy', count: 1, image: `https://${cdn}/website/badges/individual/cowboy.png` },
  { name: 'Rancher', count: 3, image: `https://${cdn}/website/badges/individual/rancher.png` },
  { name: 'Cow Herder', count: 5, image: `https://${cdn}/website/badges/individual/herder.png` },
  { name: 'Cow Breeder', count: 10, image: `https://${cdn}/website/badges/individual/breeder.png` },
  { name: 'Cow Mogul', count: 20, image: `https://${cdn}/website/badges/individual/mogul.png` },
  { name: 'Cow Tycoon', count: 50, image: `https://${cdn}/website/badges/individual/tycoon.png` },
  { name: 'Serial Cowpreneur', count: 100, image: `https://${cdn}/website/badges/individual/cowpreneur.png` },
]

const wealthGoals = [
  { name: 'Minimum Wage', value: 0.01, image: `https://${cdn}/website/badges/redeemable/minimum_wage.png` },
  { name: 'Savings Account', value: 0.05, image: `https://${cdn}/website/badges/redeemable/savings.png` },
  { name: 'Money Bags', value: 0.10, image: `https://${cdn}/website/badges/redeemable/money_bags.png` },
  { name: 'Money Vault', value: 0.20, image: `https://${cdn}/website/badges/redeemable/money_vault.png` },
  { name: '50 Cent', value: 0.50, image: `https://${cdn}/website/badges/redeemable/50_cent.png` },
  { name: 'Chuck Norris', value: 1.00, image: `https://${cdn}/website/badges/redeemable/chuck_norris.png` }
]

const burnedGoals = [
  { name: 'Beef Cubes', count: 4, image: `https://${cdn}/website/badges/culling/beef_cubes.png` },
  { name: 'Beef Jerky', count: 8, image: `https://${cdn}/website/badges/culling/beef_jerky.png` },
  { name: 'Burger Steak', count: 16, image: `https://${cdn}/website/badges/culling/burger_steak.png` },
  { name: 'Well Done', count: 32, image: `https://${cdn}/website/badges/culling/well_done.png` },
  { name: 'Momma\'s Ribs', count: 64, image: `https://${cdn}/website/badges/culling/mommas_ribs.png` },
  { name: 'Cookout', count: 128, image: `https://${cdn}/website/badges/culling/cookout.png` },
]

export default function useTrophies(
  crews: RankedData[],
  redeemable: number,
  steaks: number
) {
  const active: TrophyProps[] = [];
  const inactive: TrophyProps[] = [];

  holderGoals.forEach(badge => {
    crews.length < badge.count 
      ? inactive.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.count} x Cow Holder`
      }): active.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.count} x Cow Holder`
      });
  });

  wealthGoals.forEach(badge => {
    redeemable < badge.value
      ? inactive.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.value.toFixed(2)} Redeemable`
      }): active.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.value.toFixed(2)} Redeemable`
      });
  })

  burnedGoals.forEach(badge => {
    steaks < badge.count
      ? inactive.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.count} Cows Burned`
      }): active.push({
        image: badge.image,
        name: badge.name,
        content: `${badge.count} Cows Burned`
      });
  })

  return { active, inactive };
};